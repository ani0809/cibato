import { Code, DollarSign, TrendingUp, Search, Palette, Video, ArrowUpRight, Monitor, BarChart, Megaphone, Smartphone, Mail, Server, FileText, Mic, AtSign } from 'lucide-react';

const icons = { Code, DollarSign, TrendingUp, Search, Palette, Video, ArrowUpRight, Monitor, BarChart, Megaphone, Smartphone, Mail, Server, FileText, Mic, AtSign };

console.log('Checking icons...');
for (const [name, icon] of Object.entries(icons)) {
    if (!icon) {
        console.error(`ERROR: Icon ${name} is undefined!`);
    } else {
        console.log(`OK: ${name}`);
    }
}
