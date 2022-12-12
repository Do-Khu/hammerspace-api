type DeckDto = {
    id: number,
    deckname: string,
    coloridentity: string,
    commandercardid: number,
    cardname: string,
    totalcards: number,
    ownedCards: number;
    cards: DeckCardDto[]
}