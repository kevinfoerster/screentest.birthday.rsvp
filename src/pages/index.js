import React from "react"
import { Link } from "gatsby"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { isAbsolute } from "upath";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Formik
      initialValues={{ email: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const url = `/.netlify/functions/createGuest`;

        fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',

          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(response => {
            response.message === 'ok' && alert('all good');
            setSubmitting(false);
          })

      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" placeholder="name" />
          <Field type="email" name="email" placeholder="email" />
          <Field type="text" name="partner" placeholder="partner" />
          <Field type="text" name="sweet" placeholder="honey?" />
          <ErrorMessage name="email" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
