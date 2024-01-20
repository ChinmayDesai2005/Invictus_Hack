import User from "../models/user.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something is wrong with the refresh and access Token")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
const {email,userName,password} = req.body;
if(!email){
    throw new ApiError(401,"Email is required")
}
if (!userName) {
    throw new ApiError(401, "Email is required");
}
if (!password) {
    throw new ApiError(401, "Email is required");
}

const existedUser = await User.findOne({
    $or: [{userName},{email}]
})

if(existedUser){
    throw new ApiError(401,"User with same email or username exists");
}

const user = await User.create({
    email,
    userName: userName.toLowerCase(),
    password,
});

const createdUser = await User.findById(user._id).select("-password -refreshToken");

if(!createdUser){
    throw new ApiError(500,"Something went wrong in signing up")
}

return res.status(200).json(new ApiResponse(200,createdUser,"User registered Successfully"))

})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email){
        throw new ApiError(400,"Email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400,"User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials");
    }

        const { accessToken, refreshToken } =
            await generateAccessAndRefereshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
})

export { loginUser, registerUser };