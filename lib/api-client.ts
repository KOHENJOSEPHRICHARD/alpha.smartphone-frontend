// API Client for frontend-backend communication

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// ========================= TYPES =========================

export interface Phone {
  id: number
  name: string
  brand: string
  model: string
  description?: string
  condition:
    | "BRAND_NEW"
    | "LIKE_NEW"
    | "EXCELLENT"
    | "GOOD"
    | "FAIR"
    | "REFURBISHED"
  images: string[] // REQUIRED
  displaySize?: string
  displayType?: string
  processor?: string
  ram?: string
  storage?: string
  battery?: string
  mainCamera?: string
  frontCamera?: string
  operatingSystem?: string
  network?: string
  simType?: string
  colors?: string
  weight?: string
  dimensions?: string
  isFeatured?: boolean
  isAvailable?: boolean
  viewCount?: number
  inquiryCount?: number
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Inquiry {
  id?: number
  name: string
  email: string
  phoneNumber?: string
  phoneId?: number
  phoneName?: string
  message: string
  status?: string
  adminNotes?: string
  createdAt?: string
}

export interface Analytics {
  totalProducts: number
  totalViews: number
  totalInquiries: number
  totalWhatsAppClicks: number
  estimatedRevenue?: string
}

export interface AuthResponse {
  token: string
  id: number
  username: string
  email: string
  fullName: string
  role: string
}

// ========================= API CLIENT =========================

class ApiClient {
  private token: string | null = null
  private maxRetries = 3
  private retryDelay = 1000

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token)
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("admin_token")
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token")
    }
  }

  // ========================= CORE REQUEST =========================

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const token = this.getToken()

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers && 
          typeof options.headers === "object" && 
          !Array.isArray(options.headers) && 
          !(options.headers instanceof Headers)
          ? options.headers as Record<string, string> 
          : {}),
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      let response: Response
      try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
          signal: controller.signal,
        })
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        
        // Handle network errors
        if (fetchError.name === "AbortError") {
          throw new Error("Request timeout. Please check your connection and try again.")
        }
        
        if (fetchError.message?.includes("Failed to fetch") || fetchError.message?.includes("NetworkError")) {
          throw new Error(
            "Cannot connect to the server. Please ensure the backend is running on http://localhost:8080"
          )
        }
        
        throw new Error(fetchError.message || "Network error occurred")
      }

      clearTimeout(timeoutId)

      // ========================= ERROR HANDLING =========================
      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken()
          throw new Error("Unauthorized. Please login again.")
        }

        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`
        let errorPayload: any = null
        
        try {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            errorPayload = await response.json()
          } else {
            // Try to get text response
            const text = await response.text()
            if (text) {
              errorMessage = text
            }
          }
        } catch (parseError) {
          // If we can't parse the error, use status text
          errorMessage = response.statusText || errorMessage
        }

        // Check if backend is unreachable (connection error)
        if (response.status === 0) {
          throw new Error(
            "Backend server is not running. Please start the backend on http://localhost:8080"
          )
        }

        // 🔥 Spring Validation Errors - Handle multiple formats
        if (errorPayload && typeof errorPayload === "object") {
          // Format 1: Array of error objects (Spring Boot standard)
          if (Array.isArray(errorPayload)) {
            const messages = errorPayload
              .map((err: any) => {
                if (typeof err === "string") return err
                if (err.message) return err.message
                if (err.defaultMessage) return err.defaultMessage
                if (err.field && err.defaultMessage) {
                  return `${err.field}: ${err.defaultMessage}`
                }
                return null
              })
              .filter((msg: any) => msg)
            
            if (messages.length > 0) {
              throw new Error(messages.join(", "))
            }
          }
          
          // Format 2: Nested errors array
          if (errorPayload.errors && Array.isArray(errorPayload.errors)) {
            const messages = errorPayload.errors
              .map((err: any) => {
                if (typeof err === "string") return err
                if (err.message) return err.message
                if (err.defaultMessage) return err.defaultMessage
                if (err.field && err.defaultMessage) {
                  return `${err.field}: ${err.defaultMessage}`
                }
                return null
              })
              .filter((msg: any) => msg)
            
            if (messages.length > 0) {
              throw new Error(messages.join(", "))
            }
          }
          
          // Format 3: Object with field names as keys (simple validation errors)
          // Only process if it's not a standard error response with a message
          if (!errorPayload.message && !errorPayload.error) {
            const fieldMessages: string[] = []
            for (const [key, value] of Object.entries(errorPayload)) {
              if (value && typeof value !== "object") {
                fieldMessages.push(`${key}: ${value}`)
              } else if (value && Array.isArray(value)) {
                // Handle array of messages for a field
                const msgs = value.filter((v: any) => v && typeof v === "string")
                if (msgs.length > 0) {
                  fieldMessages.push(`${key}: ${msgs.join(", ")}`)
                }
              }
            }
            
            if (fieldMessages.length > 0) {
              throw new Error(fieldMessages.join(", "))
            }
          }
          
          // Format 4: Standard error response with message
          if (errorPayload.message) {
            // If message is just "Validation failed", try to extract more details
            if (errorPayload.message === "Validation failed" || errorPayload.message.toLowerCase().includes("validation")) {
              // Try to find additional error details
              const details: string[] = []
              
              // Check for field errors
              for (const [key, value] of Object.entries(errorPayload)) {
                if (key !== "message" && key !== "error" && key !== "status" && key !== "timestamp" && value) {
                  if (typeof value === "string") {
                    details.push(value)
                  } else if (Array.isArray(value)) {
                    const msgs = value.filter((v: any) => v && typeof v === "string")
                    details.push(...msgs)
                  }
                }
              }
              
              if (details.length > 0) {
                throw new Error(details.join(", "))
              }
            }
            
            errorMessage = errorPayload.message
          }
          
          // Format 5: Spring error response structure
          if (errorPayload.error && errorPayload.message) {
            errorMessage = `${errorPayload.error}: ${errorPayload.message}`
          }
        }

        // Provide helpful error messages based on status code
        if (response.status === 400) {
          throw new Error(`Validation Error: ${errorMessage}`)
        } else if (response.status === 404) {
          throw new Error(`Resource not found. Please check the server is running.`)
        } else if (response.status === 500) {
          throw new Error(`Server error: ${errorMessage}`)
        } else if (response.status >= 500) {
          throw new Error(`Backend server error. Please ensure the backend is running on http://localhost:8080`)
        }

        throw new Error(errorMessage)
      }

      // Parse successful response
      try {
        const data = await response.json()
        return data?.data !== undefined ? data.data : data
      } catch (parseError) {
        throw new Error("Invalid response from server. Expected JSON format.")
      }
    } catch (error) {
      // Don't retry on certain errors
      if (
        error instanceof Error &&
        (error.message.includes("Unauthorized") ||
         error.message.includes("timeout") ||
         error.message.includes("Invalid response"))
      ) {
        throw error
      }

      // Retry logic
      if (
        retryCount < this.maxRetries &&
        error instanceof Error
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryDelay * (retryCount + 1))
        )
        return this.request<T>(endpoint, options, retryCount + 1)
      }
      throw error
    }
  }

  // ========================= AUTH =========================

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async logout() {
    this.clearToken()
  }

  // ========================= PHONES =========================

  async getPhones(): Promise<Phone[]> {
    return this.request<Phone[]>("/phones")
  }

  async getPhone(id: number): Promise<Phone> {
    return this.request<Phone>(`/phones/${id}`)
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Upload failed" }))
      throw new Error(error.error || "Failed to upload image")
    }

    const data = await response.json()
    return data.url
  }

  async createPhone(data: Partial<Phone>): Promise<Phone> {
    // 🔒 Enforce backend-required fields
    if (!data.images || data.images.length === 0) {
      throw new Error("At least one image is required")
    }
    if (!data.condition) {
      throw new Error("Condition is required")
    }

    return this.request<Phone>("/phones", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        isFeatured: data.isFeatured ?? false,
        isAvailable: data.isAvailable ?? true,
      }),
    })
  }

  async updatePhone(id: number, data: Partial<Phone>): Promise<Phone> {
    return this.request<Phone>(`/phones/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deletePhone(id: number): Promise<void> {
    return this.request<void>(`/phones/${id}`, {
      method: "DELETE",
    })
  }

  async getFeaturedPhones(): Promise<Phone[]> {
    return this.request<Phone[]>("/phones/featured")
  }

  async searchPhones(keyword: string): Promise<Phone[]> {
    return this.request<Phone[]>(
      `/phones/search?keyword=${encodeURIComponent(keyword)}`
    )
  }

  // ========================= INQUIRIES =========================

  async getInquiries(): Promise<Inquiry[]> {
    return this.request<Inquiry[]>("/inquiries")
  }

  async createInquiry(data: Inquiry): Promise<Inquiry> {
    return this.request<Inquiry>("/inquiries", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateInquiryStatus(
    id: number,
    status: string,
    adminNotes?: string
  ): Promise<Inquiry> {
    const params = new URLSearchParams({ status })
    if (adminNotes) params.append("adminNotes", adminNotes)

    return this.request<Inquiry>(
      `/inquiries/${id}/status?${params.toString()}`,
      { method: "PUT" }
    )
  }

  async deleteInquiry(id: number): Promise<void> {
    return this.request<void>(`/inquiries/${id}`, {
      method: "DELETE",
    })
  }

  // ========================= ANALYTICS =========================

  async trackEvent(phoneId: number, eventType: string): Promise<void> {
    return this.request<void>(
      `/analytics/track?phoneId=${phoneId}&eventType=${encodeURIComponent(
        eventType
      )}`,
      { method: "POST" }
    )
  }

  async getDashboardAnalytics(): Promise<Analytics> {
    return this.request<Analytics>("/analytics/dashboard")
  }

  async getTopProducts(): Promise<any> {
    return this.request<any>("/analytics/top-products")
  }

  // ========================= AUDIT LOGS =========================

  async getRecentLogs(hours = 24): Promise<any[]> {
    return this.request<any[]>(`/audit-logs/recent?hours=${hours}`)
  }

  async getEntityLogs(type: string, id: number): Promise<any[]> {
    return this.request<any[]>(`/audit-logs/entity/${type}/${id}`)
  }
}

export const apiClient = new ApiClient()
