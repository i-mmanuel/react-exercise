# CRUK technical exercise (React)

## Task details

- We will be testing your ability to understand an existing React/Typescript codebase understand what is already and build what is not
- You will be building a form using the CRUK React Component Library and a form library of your choice such React Hook Form or Formik and a validation library of your choice such as Zod or Yup.
- This form which will fetch assets from the NASA Images and Video Library API The fields described below will modify the search query.
- The media returned should be displayed in list below the form, these may be images, video, or audio clips. It is up to you how you display these
- The user should only see the first 10 items on the page. If you have time, getting this working with some form pagination is a stretch target.
- Code must be clean and production ready, quality is better than quantity.
- Feel free to edit this readme or add a new readme file for any additional information, such as what you might do improve your application in the future.
- Please do not attempt to push to this repo, ideally we would like you to create your own fork.

## Tools to be used

- CRUK React Component Library Storybook site: https://master.d28a8la187lo73.amplifyapp.com/
- CRUK React Component Library Package: https://www.npmjs.com/package/@cruk/cruk-react-components
- Styled Components (What the CRUK Component Library was built with) https://styled-components.com/docs
- NASA Images and Video Library API https://api.nasa.gov/

## Optional Libraries

- React Hook Form (Forms): https://react-hook-form.com/
- Formik (Forms): https://formik.org/docs/overview
- Zod (Validation) https://zod.dev/
- Yup (Validation) https://github.com/jquense/yup

## Form fields

This form has 3 fields and error messages should appear below each field.

### Keywords field

| Attribute | Value    |
| :-------- | :------- |
| Label     | Keywords |
| Name      | keywords |
| Required  | true     |
| Type      | text     |
| Default   | ""       |

### Keywords validation

| Type       | Value | Message                                     |
| :--------- | :---- | :------------------------------------------ |
| min length | 2     | "keywords must have at least 2 characters." |
| max length | 50    | "keywords must have at most 50 characters." |

An error message should appear below the field

### Media type field

| Attribute | Value                       |
| :-------- | :-------------------------- |
| Label     | Media type                  |
| Name      | mediaType                   |
| Required  | true                        |
| Type      | select                      |
| Values    | [“audio”, “video”, “image”] |
| Default   | none                        |

### Media types validation

| Type     | Value             | Message                       |
| :------- | :---------------- | :---------------------------- |
| if unset | null or undefined | "Please select a media type." |

### Year start field

| Attribute | Value      |
| :-------- | :--------- |
| Label     | Year start |
| Name      | yearStart  |
| Required  | false      |
| Type      | text       |
| Default   | ""         |

### Year start validation

| Type        | Value                  | Message                                 |
| :---------- | :--------------------- | :-------------------------------------- |
| number type | any non digit charater | "Please enter a valid number."          |
| min         | 1900                   | "Year start must be after 1900."        |
| max         | current year           | "Year start must not be in the future." |

### Submit button

Submit button should change to a disabled state and label should read “Submitting…” when user clicks the submit button to submit the form. The button should return to and enabled state with label “Submit” when the API responds.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
