import { SelectMachine } from "./SelectMachine";

import { useMachine } from "../../context/MachineContext";
import { KomaxOperator } from "./KomaxOperator";

export const Komax = () => {
    const { machine_id } = useMachine();

    return <>{machine_id ? <KomaxOperator /> : <SelectMachine />}</>;
};
