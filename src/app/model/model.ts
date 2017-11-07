export abstract class Model {

    ID: string;
    URL: string;

    abstract getObject(includeID);

}
