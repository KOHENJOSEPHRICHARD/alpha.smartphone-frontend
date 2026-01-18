"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Save,
  Globe,
  Mail,
  Bell,
  Shield,
  Palette,
  Database,
  Server,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"

interface SettingsData {
  // General Settings
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  address: string

  // Email Settings
  smtpHost: string
  smtpPort: string
  smtpUsername: string
  smtpPassword: string
  smtpFromEmail: string
  emailEnabled: boolean

  // Notification Settings
  notifyNewInquiries: boolean
  notifyNewProducts: boolean
  notifyLowStock: boolean
  notificationEmail: string

  // Security Settings
  sessionTimeout: string
  requireTwoFactor: boolean
  passwordMinLength: string
  maxLoginAttempts: string

  // Appearance Settings
  theme: string
  language: string
  itemsPerPage: string

  // API Settings
  apiRateLimit: string
  enableApiAccess: boolean
  apiKey: string

  // Maintenance Settings
  maintenanceMode: boolean
  maintenanceMessage: string
  autoBackup: boolean
  backupFrequency: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSmtpPassword, setShowSmtpPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [settings, setSettings] = useState<SettingsData>({
    // General Settings
    siteName: "Alpha.SmartPhone",
    siteDescription: "Premium Smartphone Retailer",
    contactEmail: "alpha.smartphone.cz@gmail.com",
    contactPhone: "+255629707898",
    whatsappNumber: "255629707898",
    address: "Dar es Salaam, Tanzania",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpFromEmail: "alpha.smartphone.cz@gmail.com",
    emailEnabled: false,

    // Notification Settings
    notifyNewInquiries: true,
    notifyNewProducts: false,
    notifyLowStock: true,
    notificationEmail: "alpha.smartphone.cz@gmail.com",

    // Security Settings
    sessionTimeout: "30",
    requireTwoFactor: false,
    passwordMinLength: "8",
    maxLoginAttempts: "5",

    // Appearance Settings
    theme: "system",
    language: "en",
    itemsPerPage: "20",

    // API Settings
    apiRateLimit: "100",
    enableApiAccess: true,
    apiKey: "sk_live_alpha_smartphone_2025_secure_key",

    // Maintenance Settings
    maintenanceMode: false,
    maintenanceMessage: "We're currently performing maintenance. Please check back soon.",
    autoBackup: true,
    backupFrequency: "daily",
  })

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("admin_settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
  }, [router])

  const handleChange = (field: keyof SettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSaveSuccess(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      // Simulate API call - in production, this would save to backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage (in production, save to backend)
      localStorage.setItem("admin_settings", JSON.stringify(settings))

      setSaveSuccess(true)
      toast.success("Settings saved successfully!")

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestEmail = async () => {
    toast.info("Sending test email...")
    // In production, this would call the backend to send a test email
    setTimeout(() => {
      toast.success("Test email sent successfully!")
    }, 1500)
  }

  const handleGenerateApiKey = () => {
    const newKey = `sk_live_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    handleChange("apiKey", newKey)
    toast.success("New API key generated!")
  }

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "api", label: "API", icon: Server },
    { id: "maintenance", label: "Maintenance", icon: Database },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
              Settings
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your application configuration and preferences</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 glass-card border-2">
          <CardContent className="p-0">
            <div className="space-y-1 p-2 sm:p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>Configure your site's basic information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleChange("siteName", e.target.value)}
                        placeholder="Your Site Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => handleChange("contactEmail", e.target.value)}
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleChange("siteDescription", e.target.value)}
                      placeholder="Brief description of your business"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        value={settings.contactPhone}
                        onChange={(e) => handleChange("contactPhone", e.target.value)}
                        placeholder="+255629707898"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                      <Input
                        id="whatsappNumber"
                        value={settings.whatsappNumber}
                        onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                        placeholder="255629707898"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Your business address"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>Configure SMTP settings for sending emails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Email</Label>
                      <p className="text-sm text-muted-foreground">Enable email sending functionality</p>
                    </div>
                    <Switch
                      checked={settings.emailEnabled}
                      onCheckedChange={(checked) => handleChange("emailEnabled", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.smtpHost}
                        onChange={(e) => handleChange("smtpHost", e.target.value)}
                        placeholder="smtp.gmail.com"
                        disabled={!settings.emailEnabled}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) => handleChange("smtpPort", e.target.value)}
                        placeholder="587"
                        disabled={!settings.emailEnabled}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => handleChange("smtpUsername", e.target.value)}
                      placeholder="your-email@gmail.com"
                      disabled={!settings.emailEnabled}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <div className="relative">
                      <Input
                        id="smtpPassword"
                        type={showSmtpPassword ? "text" : "password"}
                        value={settings.smtpPassword}
                        onChange={(e) => handleChange("smtpPassword", e.target.value)}
                        placeholder="Your SMTP password"
                        disabled={!settings.emailEnabled}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                      >
                        {showSmtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpFromEmail">From Email Address</Label>
                    <Input
                      id="smtpFromEmail"
                      type="email"
                      value={settings.smtpFromEmail}
                      onChange={(e) => handleChange("smtpFromEmail", e.target.value)}
                      placeholder="noreply@example.com"
                      disabled={!settings.emailEnabled}
                    />
                  </div>

                  <Button
                    onClick={handleTestEmail}
                    variant="outline"
                    disabled={!settings.emailEnabled}
                    className="w-full"
                  >
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Inquiries</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new customer inquiries arrive</p>
                      </div>
                      <Switch
                        checked={settings.notifyNewInquiries}
                        onCheckedChange={(checked) => handleChange("notifyNewInquiries", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Products</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new products are added</p>
                      </div>
                      <Switch
                        checked={settings.notifyNewProducts}
                        onCheckedChange={(checked) => handleChange("notifyNewProducts", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when product stock is low</p>
                      </div>
                      <Switch
                        checked={settings.notifyLowStock}
                        onCheckedChange={(checked) => handleChange("notifyLowStock", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">Notification Email</Label>
                    <Input
                      id="notificationEmail"
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) => handleChange("notificationEmail", e.target.value)}
                      placeholder="notifications@example.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                        placeholder="30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) => handleChange("passwordMinLength", e.target.value)}
                        placeholder="8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleChange("maxLoginAttempts", e.target.value)}
                      placeholder="5"
                    />
                    <p className="text-sm text-muted-foreground">Account will be locked after this many failed attempts</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={settings.requireTwoFactor}
                      onCheckedChange={(checked) => handleChange("requireTwoFactor", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance & Display
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={settings.theme} onValueChange={(value) => handleChange("theme", value)}>
                        <SelectTrigger id="theme">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => handleChange("language", value)}>
                        <SelectTrigger id="language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemsPerPage">Items Per Page</Label>
                    <Select value={settings.itemsPerPage} onValueChange={(value) => handleChange("itemsPerPage", value)}>
                      <SelectTrigger id="itemsPerPage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* API Settings */}
          {activeTab === "api" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    API Configuration
                  </CardTitle>
                  <CardDescription>Manage API access and rate limiting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">Allow external API access to your data</p>
                    </div>
                    <Switch
                      checked={settings.enableApiAccess}
                      onCheckedChange={(checked) => handleChange("enableApiAccess", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests per hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleChange("apiRateLimit", e.target.value)}
                      placeholder="100"
                      disabled={!settings.enableApiAccess}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={settings.apiKey}
                          readOnly
                          disabled={!settings.enableApiAccess}
                          className="font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGenerateApiKey}
                        disabled={!settings.enableApiAccess}
                      >
                        Generate New
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Keep this key secure. Do not share it publicly.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Maintenance Settings */}
          {activeTab === "maintenance" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Maintenance & Backups
                  </CardTitle>
                  <CardDescription>Configure maintenance mode and backup settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
                    />
                  </div>

                  {settings.maintenanceMode && (
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={settings.maintenanceMessage}
                        onChange={(e) => handleChange("maintenanceMessage", e.target.value)}
                        placeholder="We're currently performing maintenance..."
                        rows={3}
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Enable automatic database backups</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleChange("autoBackup", checked)}
                    />
                  </div>

                  {settings.autoBackup && (
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select
                        value={settings.backupFrequency}
                        onValueChange={(value) => handleChange("backupFrequency", value)}
                      >
                        <SelectTrigger id="backupFrequency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Create Manual Backup Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
