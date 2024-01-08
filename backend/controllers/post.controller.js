import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const post = await Post.create({
      title,
      description,
      user: req?.user?._id,
    });
    res.status(201).json({
      success: true,
      message: "Post Uploaded Successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Data Fetched Successfully!",
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Data Fetching Failed",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req?.user?._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "Data Fetced Successfully!",
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Data Fetching Failed",
    });
  }
};

export const getUserPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Data Fetced Successfully!",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Data Fetching Failed",
    });
  }
};

export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { title, description }
    );
    res.status(200).json({
      success: true,
      message: "Note Updated Successfully!",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Note Updating Failed!",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully!",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Post Deleting Failed",
    });
  }
};
