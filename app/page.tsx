"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import {
  FormStoreValues,
  formValueSchema,
  useFormStore,
} from "./stores/useFormStore";

export default function Home() {
  const storeValues = useFormStore((state) => state.values);

  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
  } = useForm<FormStoreValues>({
    resolver: zodResolver(formValueSchema),
    defaultValues: storeValues,
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Card className="m-2">
          <Card.Body>
            <Form
              className="m-2"
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
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
                    <Form.Control.Feedback type="invalid">
                      {errors.primary?.name?.message}
                    </Form.Control.Feedback>
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
              <Row>
                <div className="d-flex justify-content-center my-2">
                  <Button type="submit">Submit</Button>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </LocalizationProvider>
    </>
  );
}
