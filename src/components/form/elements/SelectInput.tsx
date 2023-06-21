import React from "react";
import Input from "@/components/form/elements/input";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/form/elements/button";

type CProps<T> = {
    source: (() => Promise<T[]>),
    title: (val: T) => string,
    onSelect: (val: T) => void,
    selected: T,
}

type CState<T> = {
    isOpen: boolean,
    options: T[],
    selectedValue: T | null,
}

export default class SelectInput<T> extends React.Component<CProps<T>, CState<T>> {

    cRef: React.RefObject<HTMLInputElement>;

    constructor(props: CProps<T>) {
        super(props);
        this.state = {
            isOpen: false,
            options: [],
            selectedValue: props.selected,
        }

        this.cRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', e => {
            if (this.state.isOpen && e.target && !this.cRef?.current?.contains?.(e.target)) {
                this.setOpened(false);
            }
        })
    }

    setOpened(isOpen: boolean) {
        console.log("Set Open");
        
        if (isOpen) {
            this.props.source().then((options) => {
                this.setState({options})
            });
        }
        this.setState({isOpen})
    }

    selectOption(option: T) {
        this.setState({selectedValue: option, isOpen: false});
        this.props.onSelect(option);
    }

    render() {

        return <div ref={this.cRef} className="relative">
            <Input
                readOnly
                onClick={() => this.setOpened(true)}
                rightIcon={faCaretDown}
                value={this.state.selectedValue ? this.props.title(this.state.selectedValue) : ""}
                className="bg-gray-300 border border-gray-200 py-3  shadow-inner placeholder-gray-600 rounded-lg w-full"
            />
            <div className={(this.state.isOpen ? "" : "hidden ") + "absolute w-full shadow-lg z-10"}>
                <div className="bg-gray-200 py-1 rounded-lg w-full mt-1 border border-gray-300">
                    {this.state.options.length == 0 && <div className="text-center text-gray-500 py-1">No results</div>}
                    {
                        this.state.options.map(
                            (option, i) => {
                                return <div
                                    className="border-b border-gray-300 py-1"
                                    key={i}
                                >
                                    <Button
                                        block
                                        className="text-black"
                                        variant={"flat"}
                                        onClick={() => this.selectOption(option)}
                                    >
                                        {this.props.title(option) || "no title"}
                                    </Button>
                                </div>
                            })
                    }
                </div>

            </div>
        </div>
    }

}