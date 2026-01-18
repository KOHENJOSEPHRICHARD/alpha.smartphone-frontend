import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const pathStr = path.join("/")
  
  try {
    const response = await fetch(`${BACKEND_URL}/${pathStr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Backend Connection Error",
        message: `Cannot connect to backend at ${BACKEND_URL}. Please ensure the Java Spring Boot backend is running.`,
        details: error.message,
      },
      { status: 503 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const pathStr = path.join("/")
  const body = await request.json()

  try {
    const response = await fetch(`${BACKEND_URL}/${pathStr}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Backend Connection Error",
        message: `Cannot connect to backend at ${BACKEND_URL}. Please ensure the Java Spring Boot backend is running.`,
        details: error.message,
      },
      { status: 503 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const pathStr = path.join("/")
  const body = await request.json()

  try {
    const response = await fetch(`${BACKEND_URL}/${pathStr}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Backend Connection Error",
        message: `Cannot connect to backend at ${BACKEND_URL}. Please ensure the Java Spring Boot backend is running.`,
        details: error.message,
      },
      { status: 503 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const pathStr = path.join("/")

  try {
    const response = await fetch(`${BACKEND_URL}/${pathStr}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Backend Connection Error",
        message: `Cannot connect to backend at ${BACKEND_URL}. Please ensure the Java Spring Boot backend is running.`,
        details: error.message,
      },
      { status: 503 }
    )
  }
}
