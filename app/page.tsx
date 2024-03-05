"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Please enter your first name"),
});

export default function Home() {
  const [store, setStore] = useState<z.infer<typeof formSchema>>({
    name: "Jon",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setStore({ name: value.name! });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    console.log(store);
  }, [store]);

  return (
    <>
      <Row className="m-2">
        <Col className="d-flex justify-content-center">
          <Card className="p-2">
            <Card.Title className="text-center">
              <Col>
                <UserCircle2 />
              </Col>
              <Col className="mt-2">Tell Us About You</Col>
            </Card.Title>
            <Card.Body>
              <Form
                onSubmit={handleSubmit((data) => {
                  alert(JSON.stringify(data));
                })}
              >
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.name}
                    {...register("name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-2" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
