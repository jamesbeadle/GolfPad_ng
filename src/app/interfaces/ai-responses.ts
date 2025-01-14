// ai-responses.ts

export interface ResponseQuery {
    content: string;
    response_type: number;
  }
  
  export interface DefaultResponse {
    headline: string;
    content: string;
    response_type: number;
  }
  
  export interface RulesRepsonse {
    headline: string;
    content: string;
    actions: string[];
    rule_number: string;
    response_type: number;
  }
  
  export interface ShotInputResponse {
    headline: string;
    content: string;
    actions: string[];
    rule_number: string;
    response_type: number;
  }
  
  export interface ShotQueryResponse {
    headline: string;
    content: string;
    response_type: number;
  }
  
  export type AIResponse =
    | ResponseQuery
    | DefaultResponse
    | RulesRepsonse
    | ShotInputResponse
    | ShotQueryResponse;
  