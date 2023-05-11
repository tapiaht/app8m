import { Task_TYPE_COLORS } from "./constants";

const getColorByTaskType = (type) => Task_TYPE_COLORS[type.toLowerCase()];

export default getColorByTaskType;
