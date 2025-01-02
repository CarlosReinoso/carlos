export async function GET() {
  console.log("🚀 ~ GET ~ TEST: Function triggered at", new Date());

  return NextResponse.json(
    { success: true, message: "Testing API route", timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
