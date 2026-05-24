import * as Yup from "yup";

export const step1Schema = Yup.object().shape({
    name: Yup.string()
        .required("Salon name is required.")
        .min(3, "Salon name must be at least 3 characters long.")
        .max(100, "Name is too long.")
});

export const step2Schema = Yup.object().shape({
    districtId: Yup.string()
        .required("Please select an operational district."),
    address: Yup.string()
        .required("Street address is required.")
        .min(5, "Please enter a complete address."),
    phoneNumber: Yup.string()
        .required("Telephone number is required.")
        .matches(
            /^(\+48)?\s?\d{3}\s?\d{3}\s?\d{3}$|^$/,
            "Please enter a valid telephone format (e.g. +48 123 456 789)"
        ),
    websiteUrl: Yup.string()
        .url("Please enter a valid URL (must start with http:// or https://)")
        .nullable()
        .transform((value) => (value === "" ? null : value))
});

export const step3Schema = Yup.object().shape({
    serviceIds: Yup.array()
        .min(1, "Please select at least one treatment service before saving.")
});