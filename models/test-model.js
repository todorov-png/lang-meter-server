import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const testSchema = new Schema(
  {
    name: { type: String, required: true },
    lang: { type: String, required: true },
    time: { type: Number, default: 0 },
    questions: [
      {
        title: { type: String, required: true },
        answers: [
          {
            text: { type: String, required: true },
            value: { type: Boolean, require: true, default: false },
          },
        ],
        rule: { type: String, required: true },
      },
    ],
  },
  { versionKey: false }
);

export default model('Test', testSchema);
