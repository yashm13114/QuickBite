import mongoose from 'mongoose';

// Define the UserVerification schema
const UserVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    uniqueString: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// Check if the model already exists before creating it again
const UserVerification = mongoose.models.UserVerification || mongoose.model('UserVerification', UserVerificationSchema);

export default UserVerification;