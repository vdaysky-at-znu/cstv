import React, {useRef, useState} from "react";
import Input from "@/components/form/elements/input";
import Button from "@/components/form/elements/button";
import {faArrowDown, faCaretDown} from "@fortawesome/free-solid-svg-icons";

export type DataOption<T> = {
    title: string,
    value: T
}

export type AutoDataSource<T> = (prompt: string, limit: number) => Promise<T[]>

type CProps<T> = {
    source: AutoDataSource<T>,
    limit?: number,
    minLength?: number,
    onSelect: (val: T) => void,
    title: (val: T) => string,
}

type CState<T> = {
    options: T[],
    isOpen: boolean,
    selectedValue: T | null,
    realInputValue: string
}

export default class AutoInput<T> extends React.Component<CProps<any>, CState<any>> {

    cRef: React.RefObject<HTMLInputElement>;

    constructor(props: CProps<T>) {
        super(props);
        this.cRef = React.createRef();
        this.state = {
            options: [],
            isOpen: false,
            selectedValue: null,
            realInputValue: ""
        }
    }

    componentDidMount() {

        // register click outside event
        document.addEventListener('mousedown', e => {
            if (this.state.isOpen && e.target && !this.cRef?.current?.contains?.(e.target)) {
                this.setState({isOpen: false})
            }
        });

    }

    onValueChange(value: string) {
        if ((value?.length || 0) >= (this.props.minLength || 0)) {
            this.setState({isOpen: true, realInputValue: value});
            this.props.source(value, this.props.limit || 5).then((options: any[]) => {
                this.setState({options})
            })
        }
    }

    setOpen(isOpen: boolean){
        this.setState({isOpen})
        this.onValueChange(this.state.realInputValue);
    }

    selectOption(option: T) {
        this.props.onSelect(option);
        this.onValueChange(this.props.title(option));
        this.setState({selectedValue: option, realInputValue: this.props.title(option), isOpen: false})
    }

    render() {

        return <div ref={this.cRef} className="relative">
            <Input
                value={this.state.realInputValue}
                onFocus={() => this.setOpen(true)}
                onChange={e => this.onValueChange(e.target.value)}
                rightIcon={faCaretDown}
                block
            />

            <div className={(this.state.isOpen ? "" : "hidden") + " absolute w-full shadow-lg z-10"}>
                <div className="bg-gray-200 py-1 rounded-lg w-full mt-1 border border-gray-300">
                    { this.state.options.length == 0 && <div className="text-center text-gray-500 py-1">No results</div> }
                    {this.state.options.map((option: T, i: number) => {
                        return <div key={i} className="border-b border-gray-300 py-1">
                            <Button block className="text-black" variant={"flat"}
                                    onClick={() => this.selectOption(option)}>{this.props.title(option)}</Button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    }
}