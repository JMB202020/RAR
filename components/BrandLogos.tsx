/**
 * BrandLogos — simplified monochrome wordmarks for well-known fitness brands.
 *
 * These are NOT official logos. They're inline-SVG approximations using
 * web-safe fonts, used purely as visual filler on the brand marquee on
 * /who-we-work-with to illustrate the breadth of the global gym market.
 * None of these companies are clients of Rep & Reach — the marquee label
 * makes that explicit. Trademarks belong to their respective owners.
 *
 * All logos use currentColor so the parent can recolour them via a
 * Tailwind text-* class. Each SVG has a fixed height (44 in the viewBox)
 * and a variable width so they line up on a common baseline in the marquee.
 */

import type { SVGProps } from 'react'

type LogoProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'>

interface LogoCore extends LogoProps {
  viewBox?: string
  children: React.ReactNode
  title: string
}

function LogoSvg({ viewBox = '0 0 240 44', title, children, ...rest }: LogoCore) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      fill="currentColor"
      {...rest}
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

// Common font stacks, aliased for brevity.
const SANS = 'Helvetica, Arial, sans-serif'
const HEAVY = "Impact, 'Arial Black', Haettenschweiler, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"
const SCRIPT = "'Brush Script MT', 'Lucida Handwriting', cursive"

export function EquinoxLogo(props: LogoProps) {
  return (
    <LogoSvg title="Equinox" viewBox="0 0 240 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="300"
        letterSpacing="8"
      >
        EQUINOX
      </text>
    </LogoSvg>
  )
}

export function VirginActiveLogo(props: LogoProps) {
  return (
    <LogoSvg title="Virgin Active" viewBox="0 0 260 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={SANS}
        fontSize="26"
        fontWeight="900"
        fontStyle="italic"
      >
        Virgin
      </text>
      <text
        x="98"
        y="30"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="300"
        letterSpacing="2"
      >
        ACTIVE
      </text>
    </LogoSvg>
  )
}

export function PureGymLogo(props: LogoProps) {
  return (
    <LogoSvg title="PureGym" viewBox="0 0 230 44" {...props}>
      <text x="0" y="30" fontFamily={SANS} fontSize="28" fontWeight="300">
        pure
      </text>
      <text x="75" y="30" fontFamily={SANS} fontSize="28" fontWeight="900">
        gym
      </text>
    </LogoSvg>
  )
}

export function DavidLloydLogo(props: LogoProps) {
  return (
    <LogoSvg title="David Lloyd" viewBox="0 0 260 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={SERIF}
        fontSize="24"
        fontWeight="400"
        fontStyle="italic"
      >
        David Lloyd
      </text>
      <text
        x="0"
        y="42"
        fontFamily={SANS}
        fontSize="8"
        fontWeight="400"
        letterSpacing="3"
      >
        CLUBS
      </text>
    </LogoSvg>
  )
}

export function AnytimeFitnessLogo(props: LogoProps) {
  return (
    <LogoSvg title="Anytime Fitness" viewBox="0 0 290 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={SANS}
        fontSize="26"
        fontWeight="900"
        letterSpacing="-1"
      >
        ANYTIME
      </text>
      <text
        x="135"
        y="30"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="300"
        letterSpacing="1"
      >
        fitness
      </text>
    </LogoSvg>
  )
}

export function PlanetFitnessLogo(props: LogoProps) {
  return (
    <LogoSvg title="Planet Fitness" viewBox="0 0 270 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={HEAVY}
        fontSize="28"
        fontWeight="900"
        letterSpacing="0"
      >
        PLANET
      </text>
      <text
        x="112"
        y="30"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="300"
        letterSpacing="2"
      >
        FITNESS
      </text>
    </LogoSvg>
  )
}

export function GoldsGymLogo(props: LogoProps) {
  return (
    <LogoSvg title="Gold's Gym" viewBox="0 0 220 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="32"
        fontWeight="900"
        letterSpacing="-1"
      >
        GOLD&apos;S GYM
      </text>
    </LogoSvg>
  )
}

export function F45Logo(props: LogoProps) {
  return (
    <LogoSvg title="F45 Training" viewBox="0 0 200 44" {...props}>
      <text
        x="0"
        y="34"
        fontFamily={HEAVY}
        fontSize="36"
        fontWeight="900"
        letterSpacing="-2"
      >
        F45
      </text>
      <text
        x="75"
        y="34"
        fontFamily={SANS}
        fontSize="18"
        fontWeight="300"
        letterSpacing="3"
      >
        TRAINING
      </text>
    </LogoSvg>
  )
}

export function BarrysLogo(props: LogoProps) {
  return (
    <LogoSvg title="Barry's" viewBox="0 0 190 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="30"
        fontWeight="900"
        letterSpacing="3"
      >
        BARRY&apos;S
      </text>
    </LogoSvg>
  )
}

export function OrangetheoryLogo(props: LogoProps) {
  return (
    <LogoSvg title="Orangetheory Fitness" viewBox="0 0 300 44" {...props}>
      <text
        x="0"
        y="30"
        fontFamily={SANS}
        fontSize="24"
        fontWeight="900"
        letterSpacing="0"
      >
        ORANGETHEORY
      </text>
      <text
        x="190"
        y="16"
        fontFamily={SANS}
        fontSize="12"
        fontWeight="400"
      >
        °
      </text>
      <text
        x="200"
        y="30"
        fontFamily={SANS}
        fontSize="18"
        fontWeight="300"
        letterSpacing="2"
      >
        FITNESS
      </text>
    </LogoSvg>
  )
}

export function SoulCycleLogo(props: LogoProps) {
  return (
    <LogoSvg title="SoulCycle" viewBox="0 0 220 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={SCRIPT}
        fontSize="34"
        fontWeight="700"
        fontStyle="italic"
      >
        SoulCycle
      </text>
    </LogoSvg>
  )
}

export function LesMillsLogo(props: LogoProps) {
  return (
    <LogoSvg title="Les Mills" viewBox="0 0 210 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="30"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="-1"
      >
        LES MILLS
      </text>
    </LogoSvg>
  )
}

export function CrossfitLogo(props: LogoProps) {
  return (
    <LogoSvg title="CrossFit" viewBox="0 0 230 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="32"
        fontWeight="900"
        letterSpacing="1"
      >
        CROSSFIT
      </text>
    </LogoSvg>
  )
}

export function HyroxLogo(props: LogoProps) {
  return (
    <LogoSvg title="HYROX" viewBox="0 0 180 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="34"
        fontWeight="900"
        letterSpacing="3"
      >
        HYROX
      </text>
    </LogoSvg>
  )
}

export function UfcGymLogo(props: LogoProps) {
  return (
    <LogoSvg title="UFC Gym" viewBox="0 0 190 44" {...props}>
      <text
        x="0"
        y="32"
        fontFamily={HEAVY}
        fontSize="32"
        fontWeight="900"
        letterSpacing="-1"
      >
        UFC GYM
      </text>
    </LogoSvg>
  )
}

/**
 * Ordered list of logos used by the marquee. Tuple of [Component, label].
 * Label is used only for the key; the component renders its own aria-label.
 */
export const FITNESS_BRAND_LOGOS: ReadonlyArray<
  readonly [(props: LogoProps) => React.JSX.Element, string]
> = [
  [EquinoxLogo, 'Equinox'],
  [VirginActiveLogo, 'Virgin Active'],
  [PureGymLogo, 'PureGym'],
  [DavidLloydLogo, 'David Lloyd'],
  [AnytimeFitnessLogo, 'Anytime Fitness'],
  [PlanetFitnessLogo, 'Planet Fitness'],
  [GoldsGymLogo, 'Golds Gym'],
  [F45Logo, 'F45'],
  [BarrysLogo, 'Barrys'],
  [OrangetheoryLogo, 'Orangetheory'],
  [SoulCycleLogo, 'SoulCycle'],
  [LesMillsLogo, 'Les Mills'],
  [CrossfitLogo, 'CrossFit'],
  [HyroxLogo, 'HYROX'],
  [UfcGymLogo, 'UFC Gym'],
]
