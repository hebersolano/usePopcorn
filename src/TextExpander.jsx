import PropTypes from "prop-types";
import { useState } from "react";

TextExpander.propTypes = {
  children: PropTypes.string,
};
export default function TextExpander({
  children,
  showNumWords,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09c",
  expanded = false,
  className,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <p className={className}>
      {isExpanded ? children : hideByNumbWords(children, showNumWords) + "..."}
      <a
        role="button"
        style={{ color: buttonColor, cursor: "pointer" }}
        type="button"
        onClick={() => setIsExpanded((state) => !state)}
      >
        {isExpanded ? ` ${collapseButtonText}` : ` ${expandButtonText}`}
      </a>
    </p>
  );
}

// HELPERS
function hideByNumbWords(str, numWords) {
  const strArr = str.trim().split(/\s+/);
  return strArr.slice(0, numWords).join(" ");
}

{/* <TextExpander
showNumWords={20}
expandButtonText="Show text"
collapseButtonText="Collapse text"
buttonColor="#ff6622"
expanded={true}
className="box"
>
Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new worlds. It's the stuff of
dreams and science fiction, but believe it or not, space travel is a real thing. Humans and robots are constantly
venturing out into the cosmos to uncover its secrets and push the boundaries of what's possible.
</TextExpander> */}