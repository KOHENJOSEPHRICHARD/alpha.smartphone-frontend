import { NextRequest, NextResponse } from "next/server"

/**
 * MOCK BACKEND FOR DEVELOPMENT
 * This provides demo data when the real backend is not running
 * Remove or disable this when using the real Java backend
 */

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Mock phone data
  if (pathname.includes("/api/phones") && !pathname.includes("/search")) {
    return NextResponse.json({
      data: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          brand: "Apple",
          model: "iPhone 15 Pro Max",
          condition: "BRAND_NEW",
          description: "Latest Apple flagship with A17 Pro chip",
          processor: "A17 Pro",
          ram: "8GB",
          storage: "512GB",
          displaySize: "6.7 inch",
          displayType: "Dynamic Island OLED",
          battery: "4685mAh",
          mainCamera: "48MP",
          frontCamera: "12MP",
          operatingSystem: "iOS 17",
          network: "5G",
          images: ["/premium-black-smartphone.png"],
          isFeatured: true,
          isAvailable: true,
          viewCount: 156,
          inquiryCount: 12,
        },
      ],
    })
  }

  // Mock featured phones
  if (pathname.includes("/phones/featured")) {
    return NextResponse.json({
      data: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          brand: "Apple",
          model: "iPhone 15 Pro Max",
          condition: "BRAND_NEW",
          images: ["/premium-black-smartphone.png"],
          isFeatured: true,
          isAvailable: true,
        },
      ],
    })
  }

  // Mock analytics
  if (pathname.includes("/analytics/dashboard")) {
    return NextResponse.json({
      data: {
        totalProducts: 45,
        totalViews: 2350,
        totalInquiries: 89,
        totalWhatsAppClicks: 234,
        estimatedRevenue: "$15,420",
      },
    })
  }

  // Mock inquiries
  if (pathname.includes("/inquiries")) {
    return NextResponse.json({
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+1234567890",
          phoneId: 1,
          phoneName: "iPhone 15 Pro Max",
          message: "Is this phone available?",
          status: "PENDING",
          createdAt: new Date().toISOString(),
        },
      ],
    })
  }

  return NextResponse.json({
    error: "Not found",
    message: "Please ensure backend is running at http://localhost:8080",
  })
}

export async function POST(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Mock create phone
  if (pathname.includes("/phones")) {
    const body = await request.json()
    return NextResponse.json({
      data: {
        id: Math.floor(Math.random() * 1000),
        ...body,
        createdAt: new Date().toISOString(),
        viewCount: 0,
        inquiryCount: 0,
      },
    })
  }

  // Mock create inquiry
  if (pathname.includes("/inquiries")) {
    const body = await request.json()
    return NextResponse.json({
      data: {
        id: Math.floor(Math.random() * 1000),
        ...body,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      },
    })
  }

  // Mock login
  if (pathname.includes("/auth/login")) {
    return NextResponse.json({
      data: {
        token: "mock_token_" + Date.now(),
        id: 1,
        username: "admin",
        email: "admin@example.com",
        fullName: "Admin User",
        role: "ADMIN",
      },
    })
  }

  return NextResponse.json({ error: "Endpoint not found" })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({
    data: {
      ...body,
      updatedAt: new Date().toISOString(),
    },
  })
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    data: { message: "Deleted successfully" },
  })
}
