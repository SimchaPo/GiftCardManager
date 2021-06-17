import { FormGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Select from "react-select";
import csc from "country-state-city";

export default function UserTemplate(props) {
  const {
    register,
    formState: { errors, touchedFields },
    setValue,
    clearErrors,
    watch,
  } = props;

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryValue, setCountryValue] = useState();
  useEffect(() => {
    setCountries(
      csc.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      }))
    );
  }, []);
  useEffect(() => {
    setCountryValue(
      countries.filter((c) => c.label === watch("country"))[0]?.value
    );
  }, [countries, watch("country")]);
  useEffect(() => {
    console.log("use effect", countryValue);

    setCities(
      csc.getCitiesOfCountry(countryValue).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    );
  }, [countryValue]);
  return (
    <div>
      <Form.Group>
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="name"
          {...register("userName", {
            required: "User Name is required",
          })}
          isValid={touchedFields.userName && !errors.userName}
          isInvalid={!!errors.userName}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.userName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Form.Group className="col-md-6">
          <Form.Label>User Email</Form.Label>
          <Form.Control
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
            isValid={touchedFields.email && !errors.email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="col-md-6">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            {...register(
              "password",
              props.passwordReq
                ? props.passwordReq
                : {
                    required: "Password is required",
                    minLength: { value: 4, message: "Password is too short" },
                    maxLength: { value: 10, message: "password is to long" },
                  }
            )}
            isValid={touchedFields.password && !errors.password}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="address"
          {...register("address", {
            required: "Address is required",
          })}
          isValid={touchedFields.address && !errors.address}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.address?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <FormGroup className="col-md-4">
          <Form.Label>Country</Form.Label>
          <Form.Control
            className="form-control-select"
            style={{ padding: "0rem !important" }}
            as={Select}
            value={countries.filter((c) => c.label === watch("country"))}
            name="country"
            placeholder="Country"
            onChange={(selectedCountry) => {
              console.log("countries changed");
              clearErrors("country");
              setValue("country", selectedCountry.label);
              setValue("city", undefined);
              setCountryValue(selectedCountry.value);
            }}
            options={countries}
            ref={() => ({
              ...register("country", {
                required: "Country is required",
              }),
            })}
            isValid={touchedFields.country && !errors.country}
            isInvalid={!!errors.country}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.country?.message}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup className="col-md-4">
          <Form.Label>City</Form.Label>
          <Form.Control
            className="form-control-select"
            as={Select}
            value={cities.filter((c) => c.label === watch("city"))}
            name="city"
            placeholder="City"
            onChange={(selectedCity) => {
              console.log("change city", selectedCity);
              clearErrors("city");
              setValue("city", selectedCity.value);
              console.log("watch city", watch("city.label"));
            }}
            options={cities}
            ref={() => ({
              ...register("city", {
                required: "City is required",
              }),
            })}
            isValid={touchedFields.city && !errors.city}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.city?.message}
          </Form.Control.Feedback>
        </FormGroup>
        <Form.Group className="col-md-4">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="zip"
            {...register("zip", {
              required: "Zip is required",
            })}
            isValid={touchedFields.zip && !errors.zip}
            isInvalid={!!errors.zip}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.zip?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}
