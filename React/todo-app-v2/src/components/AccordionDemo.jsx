import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
const AccordionDemo = () => {
  const data = [
    {
      question: "Question 1",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia eveniet nobis sapiente beatae qui aliquam, provident inventore fuga, nemo commodi error aliquid in, modi minus ex ipsa excepturi doloribus!",
    },
    {
      question: "Question 2",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia eveniet nobis sapiente beatae qui aliquam, provident inventore fuga, nemo commodi error aliquid in, modi minus ex ipsa excepturi doloribus!",
    },
    {
      question: "Question 3",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia eveniet nobis sapiente beatae qui aliquam, provident inventore fuga, nemo commodi error aliquid in, modi minus ex ipsa excepturi doloribus!",
    },
  ];
  return (
    <div className="max-w-5xl bg-gray-400 rounded-md sahdow-lg m-20 p-6">
      AccordianDemo : FAQ Section
      <Accordion.Root
        type="single"
        className="w-full bg-gray-300 rounded-md p-2 focus-within:ring focus-within:ring-teal-600"
        collapsible
      >
        {data.map((d, index) => (
          <Accordion.Item value={`item-${index}`} key={index}>
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full text-gray-800 font-semibold text-base h-8 group">
                <h3>{d.question}</h3>
                <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition-all duration-300 ease-in-out" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=open]: bg-gray-200 rounded-md">
              <p className="text-sm text-gray-600 p-4">{d.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default AccordionDemo;
