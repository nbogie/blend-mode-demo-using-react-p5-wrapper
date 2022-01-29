import { Heading, Link, Text } from "@chakra-ui/react"

export function Header() {
    return (<>
        <Heading>Blend Mode Demonstrator</Heading>
        <Text>(p5.js + React)</Text>
    </>
    )
}

export function Footer() {
    return (
        <footer>
            Source at&nbsp;
            <Link
                href="https://github.com/nbogie/blend-mode-demo-using-react-p5-wrapper"
            >
                https://github.com/nbogie/blend-mode-demo-using-react-p5-wrapper
            </Link>
            <br />
            Made using&nbsp;
            <Link href="https://github.com/P5-wrapper/react">react-p5-wrapper</Link>
        </footer>
    )
}
