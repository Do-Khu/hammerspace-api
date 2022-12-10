import dotenv from 'dotenv';
dotenv.config()

export class CardUtil{
    constructor(){}

    async fetchCardInfo(id: number): Promise<CardDto | undefined>{
        const cardUrl = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/cards/' + id
        const cardResult = await fetch(cardUrl, {
            method: 'GET'
        })
    
        if(!cardResult.ok && cardResult.status != 200){
            return 
        }
    
        const card = (await cardResult.json()) as CardDto
    }
}