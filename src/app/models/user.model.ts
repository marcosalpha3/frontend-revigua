export class User {
    constructor(
        public access_token : string,
        public changePassword : boolean,
        public userid: number,
        public username: string,
        public congregation: string,
        public congregationId: number,
        public admin: boolean,
        public email: string,
        public assistance: boolean,
        public loadBoard: boolean,
        public exibirOracaoInicial: boolean
    ) {
        
    }    
}