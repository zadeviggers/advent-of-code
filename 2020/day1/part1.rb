input = STDIN.read.split("\n")

numbers = input.map &:to_i

def program(ns)
    ns.each do |n1|
        ns.each do |n2|
            return n1 * n2 if n1 + n2 == 2020  
        end
    end
end

puts program numbers
