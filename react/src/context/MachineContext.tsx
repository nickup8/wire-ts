import { ReactNode, createContext, useContext, useState } from "react";

interface IMachineContentDefault {
    machine_id: string | null;
    setMachine: (machine_id: string) => void;
    updateMachine: () => void;
}

interface MachineProviderProps {
    children: ReactNode;
}

const MachinContentDefault = {
    machine_id: null,
    setMachine: () => {},
    updateMachine: () => {},
} as IMachineContentDefault;

const MachineContent = createContext(MachinContentDefault);

export const MachineProvider = ({ children }: MachineProviderProps) => {
    const [machine_id, _setMachine_id] = useState(
        localStorage.getItem("machine")
    );
    const setMachine = (machine_id: string) => {
        localStorage.setItem("machine", machine_id);
        _setMachine_id(machine_id);
    };
    const updateMachine = () => {
        localStorage.removeItem("machine");
        _setMachine_id(null);
    };
    return (
        <MachineContent.Provider
            value={{ machine_id, setMachine, updateMachine }}
        >
            {children}
        </MachineContent.Provider>
    );
};

export const useMachine = () => {
    return useContext(MachineContent);
};
