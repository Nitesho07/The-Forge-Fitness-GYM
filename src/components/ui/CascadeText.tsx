import React, { useState, useRef } from 'react';

export interface CascadeTextProps {
  /** The text string to animate (optional if provided as children) */
  text?: string;
  /** Children elements - can be string, React nodes, spans with custom colors, or <br /> */
  children?: React.ReactNode;
  /** HTML tag to render: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p' (default: 'span') */
  as?: React.ElementType;
  /** Additional CSS class names (text color, font size, tracking, etc. are preserved) */
  className?: string;
  /** Stagger delay between characters in seconds (default: 0.022s) */
  stagger?: number;
  /** Duration of single character transition in seconds (default: 0.42s) */
  duration?: number;
  /** Direction of roll: 'up' (default) or 'down' */
  direction?: 'up' | 'down';
  /** If true, triggers when a parent element with class 'group' is hovered */
  cascadeOnParentHover?: boolean;
  /** Optional ID attribute */
  id?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/** Recursively extracts plain text from React nodes for accessibility (sr-only & aria-label) */
function extractPlainText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractPlainText).join('');
  if (React.isValidElement(node) && node.props) {
    if (node.type === 'br') return ' ';
    const children = (node.props as { children?: React.ReactNode }).children;
    return extractPlainText(children);
  }
  return '';
}

interface Counter {
  index: number;
}

export const CascadeText: React.FC<CascadeTextProps> = ({
  text,
  children,
  as: Component = 'span',
  className = '',
  stagger = 0.022,
  duration = 0.42,
  direction = 'up',
  cascadeOnParentHover = false,
  id,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  const rawText = text ?? extractPlainText(children);

  // Counter to keep global stagger indexing across multiple words and child nodes
  const counter: Counter = { index: 0 };

  const renderTextSegment = (str: string, segmentKey: string): React.ReactNode[] => {
    if (!str) return [];

    const hasLeadingSpace = str.startsWith(' ');
    const hasTrailingSpace = str.endsWith(' ');
    const trimmed = str.trim();

    if (!trimmed) {
      // String was purely spaces
      return [<span key={`${segmentKey}-space`} className="inline-block whitespace-pre">&nbsp;</span>];
    }

    const words = trimmed.split(/\s+/);
    const result: React.ReactNode[] = [];

    if (hasLeadingSpace) {
      result.push(
        <span key={`${segmentKey}-lead-space`} className="cascade-word inline-block whitespace-nowrap mr-[0.28em]">
          &nbsp;
        </span>
      );
    }

    words.forEach((word, wordIdx) => {
      const isLastWord = wordIdx === words.length - 1;
      const chars = Array.from(word);

      const wordChars = chars.map((char) => {
        const charIndex = counter.index++;
        return (
          <span
            key={`${segmentKey}-w${wordIdx}-c${charIndex}`}
            className="cascade-char inline-block relative overflow-hidden leading-none align-bottom"
            style={{ ['--char-index' as any]: charIndex }}
          >
            <span
              className={`cascade-char-primary block leading-none ${
                cascadeOnParentHover ? 'cascade-char-primary-group' : ''
              }`}
            >
              {char}
            </span>
            <span
              aria-hidden="true"
              className={`cascade-char-secondary absolute inset-0 block leading-none select-none pointer-events-none ${
                cascadeOnParentHover ? 'cascade-char-secondary-group' : ''
              }`}
            >
              {char}
            </span>
          </span>
        );
      });

      // Preserve inter-word spacing without breaking responsiveness
      const addRightMargin = !isLastWord || hasTrailingSpace;

      result.push(
        <span
          key={`${segmentKey}-word-${wordIdx}`}
          className={`cascade-word inline-block whitespace-nowrap align-bottom ${
            addRightMargin ? 'mr-[0.28em]' : ''
          }`}
        >
          {wordChars}
        </span>
      );
    });

    return result;
  };

  const renderNodes = (node: React.ReactNode, keyPrefix = 'node'): React.ReactNode => {
    if (node == null || typeof node === 'boolean') {
      return null;
    }

    if (typeof node === 'string' || typeof node === 'number') {
      return renderTextSegment(String(node), keyPrefix);
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) => renderNodes(child, `${keyPrefix}-${idx}`));
    }

    if (React.isValidElement(node)) {
      if (node.type === 'br') {
        return <br key={`${keyPrefix}-br-${counter.index}`} />;
      }

      // Clone element while preserving all existing classes, styles, and attributes
      const existingProps = (node.props as { className?: string; children?: React.ReactNode }) || {};
      return React.cloneElement(
        node,
        {
          key: `${keyPrefix}-elem-${counter.index}`,
          className: `${existingProps.className || ''} inline-block align-bottom`,
        } as any,
        renderNodes(existingProps.children, `${keyPrefix}-sub`)
      );
    }

    return node;
  };

  const renderedContent = text ? renderTextSegment(text, 'txt') : renderNodes(children, 'root');

  const isBlockHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(
    typeof Component === 'string' ? Component.toLowerCase() : ''
  );

  return (
    <Component
      ref={containerRef}
      className={`cascade-text-container ${
        isBlockHeading ? 'block' : 'inline-block'
      } ${direction === 'down' ? 'cascade-direction-down' : ''} ${className}`}
      data-cascade-container="true"
      data-hovered={isHovered ? 'true' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      id={id}
      style={{
        ...style,
        ['--cascade-duration' as any]: `${duration}s`,
        ['--cascade-stagger' as any]: `${stagger}s`,
      }}
    >
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{rawText}</span>

      {/* Visual letter-by-letter cascade roll */}
      <span aria-hidden="true" className={`cascade-content ${isBlockHeading ? 'block' : 'inline-block'}`}>
        {renderedContent}
      </span>
    </Component>
  );
};
