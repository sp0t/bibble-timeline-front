import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import TimelineGroup from 'components/TimelineGroup';
import CharacterDot from 'components/CharacterDot';
import useLanguage from 'hooks/useLanguage';
import { joinHebrew } from 'helpers/lang';
import { getLocalized } from 'helpers/util';
import { getCharacterLink } from 'helpers/urls';
import './style.css';

const detectAsideEvent = () => {
  const message = JSON.stringify({
    channel: 'hideTooltip'
  });
  window.parent.postMessage(message, '*');
}
const renderCharacter = (c, i) => {
  if (i > 2) return false;
  if (c.showTimeLine === 1)
    return (
      <CharacterDot key={c.id} data={c} className="timeline-character-group__character" />
    );
  else
    return (
    <div></div>
  ); 
};

const renderHoverCharacter = c => (
  <li key={c.id} className="timeline-group__hover-element" onClick={detectAsideEvent}>
    <Link to={getCharacterLink(c.id)} className="timeline-group__hover-link">
      <CharacterDot data={c} className="timeline-group__hover-dot" />
      <span className="timeline-group__hover-name">{c.name}</span>
    </Link>
  </li>
);

const TimelineCharacterGroup = ({ group, width, min, max }) => {
  const lang = useLanguage();

  const { data, fromDate, endDate } = group;
  const characters = data;

  const text = useMemo(() => {
    let text = '';
    if (lang === 'he') text = joinHebrew(characters.map(c => getLocalized(c, 'name', 'he')));
    else text = characters.join(', ');
    return text;
  }, [data]);

  const styles = useMemo(() => {
    const yearCost = width / (max - min);
    const length = data.endDate - data.fromDate + 1;

    const start = Math.floor((data.fromDate - min) * yearCost);
    return {
      width: Math.round(yearCost * length),
      transform: `translateX(${start * -1}px)`,
    };
  }, [width, data, min, max]);

  const showState = (period) => {
    for(var i=0; i < period.length; i++) {
      if (period[i].showTimeLine === 1)
        return true;
    }

    return false;
  }

  const getCharacterLength = (period) => {
    let length = 0;
    for(var i=0; i < period.length; i++) {
      if (period[i].showTimeLine === 1)
        length++;
    }

    return length;
  }

  let hoverClasses = 'timeline-group__hover';
  if (characters.length > 3) hoverClasses += ' timeline-group__hover--list';

  const renderTooltip = useCallback(id => {
    return (
      <div className={hoverClasses} data-group-id={id}>
        <div className="timeline-group__hover-wrapper">
          <ScrollArea
            vertical
            smoothScrolling
            stopScrollPropagation
            className="aside__scrollarea timeline-group__scrollarea"
            contentClassName="aside__scrollable"
          >
            <ul className="timeline-group__hover-list">
              {characters.map(renderHoverCharacter)}
            </ul>
          </ScrollArea>
        </div>
      </div>
    );
  }, [hoverClasses]);

  /*if (characters.length === 1) {
    const [character] = characters;
    return (
      <Link to={getCharacterLink(character.id)} className="timeline-character-group" style={styles}>
        <div className="timeline-character-group__visible">
          <div className="timeline-character-group__characters">{renderCharacter(character, 0)}</div>
          <div className="timeline-character-group__text">{text}</div>
        </div>
      </Link>
    );
  }*/
  if (showState(data))
    return (
      <TimelineGroup
        data={data}
        fromDate={fromDate}
        endDate={endDate}
        min={min}
        max={max}
        width={width}
        className="timeline-character-group"
        visibleClassName="timeline-character-group__visible"
        visibleContent={(
          <React.Fragment>
            <div className="timeline-character-group__characters">
              {characters.map(renderCharacter)}
              {getCharacterLength(data) > 3 && (
                <div className="timeline-character-group__more">
                  {`+${getCharacterLength(data) - 3}`}
                </div>
              )}
            </div>
            <div className="timeline-character-group__text">{text}</div>
          </React.Fragment>
        )}
        tooltipClassName="timeline-character-group__hover-positioning"
        renderTooltip={renderTooltip}
        linkFn={getCharacterLink}
      />
    );
    
  return (
    <div></div>
  );

};

export default TimelineCharacterGroup;
