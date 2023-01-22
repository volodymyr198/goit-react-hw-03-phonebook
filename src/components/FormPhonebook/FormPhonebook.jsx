import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import css from './FormPhonebook.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// after usage Formik/Yup------------------------------------------------------
class FormPhonebook extends Component {
    handleSubmit = (values, { resetForm }) => {
        console.log(values);

        this.props.onSubmit(values);
        resetForm();
    };

    validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Name is required field'),
        number: Yup.number()
            .typeError('That does not look like a phone number')
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
    });

    initialValues = {
        name: '',
        number: '',
    };

    render() {
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
            >
                <Form className={css.formPhone}>
                    <label className={css.formLabel}>
                        Name
                        <Field
                            className={css.formInput}
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name" component="div" />
                    </label>
                    <label className={css.formLabel}>
                        Number
                        <Field
                            className={css.formInput}
                            type="tel"
                            name="number"
                        />
                        <ErrorMessage name="number" component="div" />
                    </label>
                    <button className={css.formBtn} type="submit">
                        Add contact
                    </button>
                </Form>
            </Formik>
        );
    }
}

FormPhonebook.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default FormPhonebook;

// before usage Formik/Yup------------------------------------------------------

/* class Form extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = e => {
        const { name, value } = e.currentTarget;

        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.elements.name.value);

        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    render() {
        const { name, number } = this.state;
        return (
            <form className={css.formPhone} onSubmit={this.handleSubmit}>
                <label className={css.formLabel}>
                    Name
                    <input
                        className={css.formInput}
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={this.handleChange}
                    />
                </label>
                <label className={css.formLabel}>
                    Number
                    <input
                        className={css.formInput}
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={this.handleChange}
                    />
                </label>
                <button className={css.formBtn} type="submit">
                    Add contact
                </button>
            </form>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Form; */
