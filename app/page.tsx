"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FormStoreValues,
  formValueSchema,
  useFormStore,
} from "./stores/useFormStore";
import Link from "next/link";

export default function Home() {
  const [storeValues, setStoreValues] = useFormStore((state) => [
    state.values,
    state.setValues,
  ]);

  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
  } = useForm<FormStoreValues>({
    resolver: zodResolver(formValueSchema),
    defaultValues: storeValues,
  });

  const {
    append,
    fields: dependents,
    remove,
  } = useFieldArray({
    control,
    name: "dependents",
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Link href={"/otherPage"}>Go To Other Page</Link>
        <Form
          className="m-2"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            setStoreValues(data);
          })}
        >
          <Card className="m-2">
            <Card.Body>
              <Row className="justify-content-center">
                <Col>
                  <Form.Group>
                    <Form.Label>Primary Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("primary.name")}
                      isInvalid={!!errors.primary?.name?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.primary?.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Col xs={12}>
                      <Form.Label>Primary Date Of Birth</Form.Label>
                    </Col>
                    <Controller
                      name="primary.dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          slotProps={{
                            textField: {
                              error: !!errors.primary?.dateOfBirth?.message,
                              helperText: errors.primary?.dateOfBirth?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <Form.Group>
                    <Form.Label>Primary Email</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("primary.email")}
                      isInvalid={!!errors.primary?.email?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.primary?.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {dependents.map((dependent, index) => (
                <Row id={dependent.id} className="justify-content-center m-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>Dependent {index + 1} Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register(`dependents.${index}.name`)}
                        isInvalid={!!errors.dependents?.[index]?.name?.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.primary?.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Col xs={12}>
                        <Form.Label>
                          Dependent {index + 1} Date Of Birth
                        </Form.Label>
                      </Col>
                      <Controller
                        name={`dependents.${index}.dateOfBirth`}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            slotProps={{
                              textField: {
                                error:
                                  !!errors.dependents?.[index]?.dateOfBirth
                                    ?.message,
                                helperText:
                                  errors.dependents?.[index]?.dateOfBirth
                                    ?.message,
                              },
                            }}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
            </Card.Body>
            <Card.Footer>
              <Row>
                <div className="d-flex justify-content-center my-2">
                  <Button className="m-1" type="submit">
                    Submit
                  </Button>
                  <Button
                    className="m-1"
                    type="button"
                    variant="success"
                    onClick={() => append({ dateOfBirth: null, name: "" })}
                  >
                    Add Dependent
                  </Button>
                </div>
              </Row>
            </Card.Footer>
          </Card>
        </Form>
      </LocalizationProvider>
    </>
  );
}
