import * as yup from "yup";

export const validationSchemas = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup
    .string()
    .required("Slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  author: yup.string().required("Author is required"),
  publishDate: yup
    .date()
    .required("Publish date is required")
    .max(new Date(), "Publish date cannot be in the future"),
  publisher: yup.string().required("Publisher is required"),
  language: yup.string().required("Language is required"),
  pages: yup
    .number()
    .required("Pages is required")
    .positive("Pages must be positive")
    .integer("Pages must be an integer"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
  authorBiography: yup
    .string()
    .required("Author biography is required")
    .min(50, "Author biography should be at least 50 characters"),
  description: yup.string().required("Description is required"),
  books: yup
    .array()
    .min(1, "At least one book image is required")
    .test(
      "fileSize",
      "Each file must be less than 2MB",
      (value) => !value || value.every((file) => file.size <= 2000000)
    )
    .test(
      "fileType",
      "Only image files are allowed",
      (value) =>
        !value || value.every((file) => file?.type?.startsWith("image/"))
    ),
  imageAltTag: yup
    .array()
    .of(yup.string().required("Alt tag is required"))
    .test(
      "alt-tag-length",
      "Alt tag is required for each image",
      (value) => value.length === formik.values.books.length
    ),
  audiobookPrice: yup.number().when("isAudiobookAvailable", {
    is: true,
    then: yup
      .number()
      .required("Audiobook price is required when audiobook is available")
      .positive("Audiobook price must be positive")
      .typeError("Audiobook price must be a number"),
  }),
  ebookPrice: yup.number().when("isEBookAvailable", {
    is: true,
    then: yup
      .number()
      .required("Ebook price is required when ebook is available")
      .positive("Ebook price must be positive")
      .typeError("Ebook price must be a number"),
  }),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be positive"),
  weightUnit: yup.string().required("Weight unit is required"),
  genre: yup.string(),
  status: yup.number(),
  metaTitle: yup.string(),
  metaDescription: yup.string(),
  canonicalTag: yup.string(),
  keywords: yup.array().of(yup.string()),
});
