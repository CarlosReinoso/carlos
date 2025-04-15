import { NextResponse } from "next/server";

export async function GET() {
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=447456531337&text=Hey%20%3A%20D%0A%0ACarlos%20here%2C%20awesome%20to%20meet!%0AI'm%20Building%20a%20Creative%20Life%20in%20Tech%2C%20Property%2C%20Music%20%26%20Travel.%0ACheck%20out%20my%20website%20%F0%9F%91%89%20https%3A%2F%2Fcarlosreinoso.co.uk%0AAlso%2C%20you%20can%20create%20a%20personalised%20eBusiness%20card%20using%20my%20app%20here%3A%20https%3A%2F%2Fcarlosreinoso.co.uk%2Fvcard%0A%0AI'm%20currently%20writing%20a%20manga%2C%20if%20you%20want%20to%20check%20it%20out%3A%20https%3A%2F%2Fcarlosreinoso.co.uk%2Fbooks%2Famara%0A%0ALet%20me%20know%20what%20you%20think!%0A%0ABless%20%E2%9C%A8%F0%9F%99%8F&type=phone_number&app_absent=0`;

  return NextResponse.redirect(whatsappUrl, 302);
}
