"use client";

import {
  PersonInfo,
  personInfoSchema,
  usePersonInfoStore,
} from "@/stores/usePersonInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";

export default function Home() {
  const [personInfo, setPersonInfo] = usePersonInfoStore((state) => [
    state.personInfo,
    state.setPersonInfo,
  ]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<PersonInfo>({
    resolver: zodResolver(personInfoSchema),
    values: personInfo,
  });

  const {
    append: appendPerson,
    remove: removePerson,
    fields: otherPeople,
  } = useFieldArray({
    name: "otherPeople",
    control,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setPersonInfo({
        name: value.name!,
        address: {
          addressLine1: value.address?.addressLine1!,
        },
        otherPeople:
          value.otherPeople?.map((person) => ({ name: person?.name ?? "" })) ??
          [],
      });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Row className="m-2 justify-content-center">
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
                <Form.Control isInvalid={!!errors.name} {...register("name")} />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  isInvalid={!!errors.address?.addressLine1}
                  {...register("address.addressLine1")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address?.addressLine1?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {otherPeople.map((person, index) => (
                <Form.Group key={person.id}>
                  <Form.Label>Person {index + 1} Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      isInvalid={!!errors?.otherPeople?.[index]}
                      {...register(`otherPeople.${index}.name`)}
                    />
                    <Button
                      onClick={() => removePerson(index)}
                      variant="danger"
                    >
                      <MinusCircle />
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors?.otherPeople?.[index]?.name?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              ))}

              {otherPeople.length < 3 ? (
                <Row>
                  <Button
                    onClick={() => appendPerson({ name: "" })}
                    className="mt-2"
                    variant="success"
                  >
                    <PlusCircle /> Add Person
                  </Button>
                </Row>
              ) : null}

              <Row>
                <Button className="mt-2" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
