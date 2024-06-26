"use client";
import { format } from "date-fns";

export default function AccordionItem({ race, index, setIndex, setCircuit , currentGpNumber , reIndexArray}) {
  const sprintTrue = race.sprintWeekend ? "visible" : "hidden";
  const sprintFalse = race.sprintWeekend ? "hidden" : "visible";
  const finishedEvent = currentGpNumber >  parseInt(race.id);
  const timeStampElementClassName = finishedEvent ? "time-stamp-element finished-event" : "time-stamp-element";
  //console.log(passedGp)

  const formatTime = (indexparam) => {
    switch (indexparam) {
      case 0:
        return race.dates[0].raceStart
          ? format(race.dates[0].raceStart, "LLL d, EEE H:mm ")
          : " TBD";
      case 1:
        return race.dates[1].qualifySession
          ? format(race.dates[1].qualifySession, "LLL d, EEE H:mm ")
          : " TBD";
      case 2:
        return race.dates[2].freepractice3
          ? format(race.dates[2].freepractice3, "LLL d, EEE H:mm ")
          : " TBD";
      case 3:
        return race.dates[3].freepractice2
          ? format(race.dates[3].freepractice2, "LLL d, EEE H:mm ")
          : " TBD";
      case 4:
        return race.dates[4].freepractice1
          ? format(race.dates[4].freepractice1, "LLL d, EEE H:mm ")
          : " TBD";
      case 5:
        return race.dates[5].sprintShootout
          ? format(race.dates[5].sprintShootout, "LLL d, EEE H:mm ")
          : " TBD";
      case 6:
        return race.dates[6].sprintStart
          ? format(race.dates[6].sprintStart, "LLL d, EEE H:mm ")
          : " TBD";
      default:
        break;
    }
  };

  const handleSetIndex = (Id) => {
    if(Id === index){setIndex(1),setCircuit(reIndexArray(currentGpNumber,Id))}
    index !== Id && setIndex(Id),setCircuit(reIndexArray(currentGpNumber,Id));
  };


  return (
    <div className={finishedEvent ? "finished-event" : ""}>
      <div  className={index === race.id ? "AccordionItemExpanded" : "AccordionItem"}>
          <div className="GpNameTag" onClick={() => handleSetIndex(race.id)}>
            {race.gpName}<span className={timeStampElementClassName}>
                {index !== race.id && format(race.dates[0].raceStart, "LLL d  H:mma")}
                {/* {race.sprintWeekend ? "Sprint Weekend" : ""} */}
              </span>
          </div>
          {index === race.id && (
            <div className="SessionsAndTimers">
                <p>Race Start <span className={timeStampElementClassName} >{formatTime(0)}</span></p>
                <p className={sprintTrue}>Sprint <span className={timeStampElementClassName} >{formatTime(6)}</span></p>
                <p className={sprintTrue}>
                  Sprint Shootout <span className={timeStampElementClassName} >{formatTime(5)}</span> 
                </p>
                <p>Qualifying <span className={timeStampElementClassName} >{formatTime(1)} </span> </p>
                <p className={sprintFalse}>FP3 <span className={timeStampElementClassName} >{formatTime(2)} </span> </p>
                <p className={sprintFalse}>FP2  <span className={timeStampElementClassName} >{formatTime(3)} </span> </p>
                <p>FP1 <span className={timeStampElementClassName} > {formatTime(4)}</span></p>
            </div>
          )}
      </div>
    </div>
  );
}
