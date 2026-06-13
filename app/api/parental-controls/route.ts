import { NextRequest, NextResponse } from 'next/server';
import { ParentalControlSettings } from '@/lib/types/parentalControls';
import { PinProtection } from '@/lib/utils/pinProtection';

// GET - Retrieve parental control settings
export async function GET(request: NextRequest) {
  try {
    const childAccountId = request.nextUrl.searchParams.get('childAccountId');
    
    if (!childAccountId) {
      return NextResponse.json(
        { error: 'childAccountId required' },
        { status: 400 }
      );
    }

    // TODO: Fetch from database
    // const settings = await db.parentalControls.findOne({ childAccountId });

    return NextResponse.json({
      message: 'Fetch settings from database',
      childAccountId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve settings' },
      { status: 500 }
    );
  }
}

// POST - Create or update parental control settings
export async function POST(request: NextRequest) {
  try {
    const body: ParentalControlSettings = await request.json();

    // Validate PIN if required
    if (body.pinRequired) {
      if (!PinProtection.isValidPin(body.pin)) {
        return NextResponse.json(
          { error: 'PIN must be 4-6 digits' },
          { status: 400 }
        );
      }

      // Hash PIN before storing
      body.pin = await PinProtection.hashPin(body.pin);
    }

    // TODO: Save to database
    // await db.parentalControls.upsert(body);

    return NextResponse.json({
      message: 'Settings saved successfully',
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
