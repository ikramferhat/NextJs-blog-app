import connectMongoDB from "@/libs/mogodb";
import Post from "@/models/PostModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return  NextResponse.json({ post }, { status: 200 });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description, newImage: image } = await request.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, description, image });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}