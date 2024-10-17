import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(_req, { params }) {
  try {
    const filePath = path.join(process.cwd(), 'app', '_data', 'products.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const page = parseInt(params.page);
    const numPerPage = 10;
    const start = (page - 1) * numPerPage + 1;
    const end = start + numPerPage - 1;
    const jsonData = JSON.parse(fileData).filter(item => item.id >= start && item.id <= end);
    console.log('fileData', jsonData);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}