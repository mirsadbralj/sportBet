export class Nullable<T>{
    public value?:T;

    constructor(value?:T){
        this.value=value;
    }
}