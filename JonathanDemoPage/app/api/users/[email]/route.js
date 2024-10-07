import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(_req, { params }) {
  try {
    const filePath = path.join(process.cwd(), 'app', '_data', 'users.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    console.log('fileData', fileData);
    const jsonData = JSON.parse(fileData).find(item => item.email === params.email);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}