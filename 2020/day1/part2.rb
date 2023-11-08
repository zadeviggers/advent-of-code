input = STDIN.read.split("\n")

numbers = input.map &:to_i

def program(ns)
    ns.each do |n1|
        ns.each do |n2|
            ns.each do |n3|
                return n1 * n2 * n3 if n1 + n2+n3 == 2020  
            end
        end
    end
end

puts program numbers
