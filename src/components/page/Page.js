import * as React from "react"
import { useState } from "react"
import { ThemeProvider, css } from '@emotion/react';
import { Helmet } from "react-helmet"
import { Theme } from "../../theme";

export const Page = ({title, children}) => {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? Theme.dark : Theme.light;

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="test" css={css`
                color: ${theme.text};
                background-color: ${theme.background};
            `}>
                {children}
            </div>
        </ThemeProvider>
    )
}