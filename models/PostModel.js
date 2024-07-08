import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,

  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default PostModel;