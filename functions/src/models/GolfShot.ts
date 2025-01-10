import { Club } from "../enums/clubs";
import { Lie } from "../enums/lies";
import { ShotIntention } from "../enums/shot-intentions";
import { ShotPosition } from "../enums/shot-position";
import { ShotResult } from "../enums/shot-results";
import { SwingLength } from "../enums/swing-length";
import { WeatherType } from "../enums/weather-type";

export interface GolferShot {
    shot_id?: number;          
    golfer_id: string;    
    club: Club;             
    yardage: number;
    lie: Lie;
    shot_intention: ShotIntention;    
    shot_result: ShotResult;         
    weather_type: WeatherType;
    shot_start_position: ShotPosition;
    shot_end_position: ShotPosition;
    swing_length: SwingLength;
  }
  