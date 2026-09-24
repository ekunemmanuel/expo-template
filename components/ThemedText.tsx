import { cn } from '@/lib/utils';
import { Text, TextProps } from 'react-native';

// Variants match specific font sizes and weights
// h1: 18px Bold
// h2: 16px Bold
// h3: 14px Bold
// h4: 12px Bold
// body: 14px Regular
// caption: 12px Regular
export type ThemedTextVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body'
    | 'caption'
    | 'default' // keeps 'default' as alias for 'body' for backward compat
    | 'link'
    | 'subtitle' // deprecated, maps to h2 or body
    | 'title';   // deprecated, maps to h1

// Color presets
export type ThemedTextType =
    | 'default'   // text-foreground
    | 'secondary' // text-muted-foreground
    | 'primary'   // text-primary
    | 'link'      // text-primary underline
    | 'error'     // text-red-500
    | 'success';  // text-green-500

export type ThemedTextProps = TextProps & {
    variant?: ThemedTextVariant;
    type?: ThemedTextType;
    className?: string;
    italic?: boolean;
};

function getFontFamily(variant: ThemedTextVariant, italic?: boolean): string {
    const base = 'Urbanist';
    let weight = 'Regular';

    switch (variant) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'title':
        case 'subtitle':
            weight = 'Bold';
            break;
        case 'link':
        case 'caption':
        case 'body':
        case 'default':
        default:
            weight = 'Regular';
            break;
    }

    const suffix = italic ? 'Italic' : '';

    if (weight === 'Regular' && italic) return `${base}-Italic`;
    if (weight === 'Regular' && !italic) return `${base}-Regular`;

    return `${base}-${weight}${suffix}`;
}

export function ThemedText({
    style,
    className,
    variant = 'body',
    type = 'default',
    italic = false,
    ...rest
}: ThemedTextProps) {

    // Map deprecated variants to new ones if needed, or handle sizing directly
    const fontFamily = getFontFamily(variant, italic);

    return (
        <Text
            className={cn(
                // size classes
                variant === 'h1' && 'text-[18px] leading-tight',
                variant === 'title' && 'text-[18px] leading-tight', // Alias for h1

                variant === 'h2' && 'text-[16px] leading-snug',
                variant === 'subtitle' && 'text-[16px] leading-snug', // Alias for h2

                variant === 'h3' && 'text-[14px]',
                variant === 'h4' && 'text-[12px]',

                // body/default sizes
                (variant === 'body' || variant === 'default') && 'text-[14px]',
                variant === 'caption' && 'text-[12px]',
                variant === 'link' && 'text-[14px] underline',

                // colors based on 'type' prop
                type === 'default' && 'text-foreground',
                type === 'secondary' && 'text-muted-foreground',
                type === 'primary' && 'text-primary',
                type === 'link' && 'text-primary',
                type === 'error' && 'text-red-500',
                type === 'success' && 'text-green-500',

                className
            )}
            style={[
                { fontFamily },
                style
            ]}
            {...rest}
        />
    );
}
