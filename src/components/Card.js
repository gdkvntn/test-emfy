import { Card, CardBody, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { getData } from "../api/api";
import { format, fromUnixTime } from "date-fns";
import { ReactComponent as Circle } from "../assets/circle.svg";

const getColorForTask = (taskDate) => {
  const now = new Date();
  const taskDueDate = new Date(fromUnixTime(taskDate));

  now.setHours(0, 0, 0, 0);
  taskDueDate.setHours(0, 0, 0, 0);

  const oneDay = 24 * 60 * 60 * 1000;

  if (taskDueDate < now) {
    return "red";
  } else if (taskDueDate.getTime() === now.getTime()) {
    return "green";
  } else if (
    taskDueDate > now &&
    taskDueDate.getTime() <= now.getTime() + oneDay
  ) {
    return "yellow";
  }
};

export const CardComponent = ({ info, isOpen, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullInfo, setFullInfo] = useState(null);
  const [status, setStatus] = useState(null);

  const handleClickCard = async () => {
    setIsLoading(true);
    const { data } = await getData(`/api/v4/leads/${info.id}`);
    const resTasks = await getData(`/api/v4/tasks?filter[entity_type][]=leads`);
    const arr = resTasks.data._embedded.tasks.filter(
      (el) => el.complete_till === data.closest_task_at
    );
    setStatus(getColorForTask(arr[0].complete_till));

    setFullInfo(data);
    setIsLoading(false);
    setOpen(data.id);
  };

  return (
    <Card
      onClick={handleClickCard}
      cursor="pointer"
      className=" hover:opacity-70"
    >
      {isLoading ? (
        <CardBody>
          <Spinner />
        </CardBody>
      ) : fullInfo && isOpen === fullInfo?.id ? (
        <CardBody className="flex justify-between">
          <div>
            <Text className="text-left">Name: {info.name}</Text>
            <Text className="text-left">ID: {info.id}</Text>
            <Text>
              Date: {format(fromUnixTime(info.created_at), "dd.MM.yyyy")}
            </Text>
            <Circle width={15} height={15} fill={status} />
          </div>
        </CardBody>
      ) : (
        <CardBody className="flex justify-between">
          <div>
            <Text className="text-left">{info.name}</Text>
            <Text className="text-left">{info.id}</Text>
          </div>
          <div>
            <Text>{info.price}</Text>
          </div>
        </CardBody>
      )}
    </Card>
  );
};
