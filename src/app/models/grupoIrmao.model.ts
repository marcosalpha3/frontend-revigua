export class GrupoIrmao{
    codigo: string;
    nome : string;
    dirigente: string;
    dirigenteId: number;
    local: string;   
    irmaos: IrmaoGrupo[];           
}

export class IrmaoGrupo{
    irmaoCodigo: number;
    irmao : string;
}
