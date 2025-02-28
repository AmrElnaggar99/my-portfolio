import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({ error: "Missing Spotify API credentials" }, { status: 500 });
  }

  try {
    // Step 1: Refresh the access token
    const authString = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${authString}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Failed to refresh token: ${errorText}`);
    }

    const { access_token } = await tokenResponse.json();

    // Step 2: Fetch my top artists
    const artistsResponse = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    if (!artistsResponse.ok) {
      const errorText = await artistsResponse.text();
      throw new Error(`Failed to fetch artists: ${errorText}`);
    }

    const artistsData = await artistsResponse.json();
    return NextResponse.json(artistsData);
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ error: "Failed to fetch top artists" }, { status: 500 });
  }
}
