import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);

export async function POST(req: Request) {
  try {
    const { email, currentPassword, newPassword } = await req.json();
    
    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Verify current password
    const currentUser = await sql`
      SELECT * FROM admin_users 
      WHERE email = ${email} AND password = ${currentPassword} 
      LIMIT 1
    `;

    if (currentUser.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Current password is incorrect' 
      }, { status: 401 });
    }

    // Update password
    await sql`
      UPDATE admin_users 
      SET password = ${newPassword} 
      WHERE email = ${email}
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });

  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to change password' 
    }, { status: 500 });
  }
} 