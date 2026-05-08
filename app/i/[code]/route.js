import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { code } = await params;
  
  // Create a URL pointing to the onboarding page with the referral code as a query param
  const url = request.nextUrl.clone();
  url.pathname = '/onboarding';
  url.searchParams.set('ref', code);

  // In a production app, we would also set a cookie here. 
  // For the prototype, we rely on the client capturing the ?ref query parameter in /onboarding.
  const response = NextResponse.redirect(url);
  
  return response;
}
