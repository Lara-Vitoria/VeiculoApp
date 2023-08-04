export class Veiculos {

    constructor(nome: string, marca: string, modelo: string,
        imagemURL: string, valor: string, quilometragem: string,
        informacoesAdicionais: string) {
        this.nome = nome;
        this.marca = marca;
        this.modelo = modelo;
        this.imagemURL = imagemURL;
        this.valor = valor;
        this.quilometragem = quilometragem;
        this.informacoesAdicionais = informacoesAdicionais;
    }

    public id!: number;
    public nome: string;
    public marca: string;
    public modelo: string;
    public imagemURL: string;
    public valor?: string;
    public quilometragem?: string;
    public informacoesAdicionais?: string;
}